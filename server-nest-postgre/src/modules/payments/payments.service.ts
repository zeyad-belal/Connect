import {
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Stripe from 'stripe';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateCheckoutDto } from './dto/create-checkout.dto';

// Flat platform fee added to every checkout (in cents). Was hardcoded inline
// in the original controller.
const SITE_FEE_CENTS = 1000;

@Injectable()
export class PaymentsService {
  private readonly logger = new Logger(PaymentsService.name);
  private stripeClient?: Stripe;
  private readonly clientDomain: string;

  constructor(
    private readonly config: ConfigService,
    private readonly prisma: PrismaService,
  ) {
    this.clientDomain = this.config.get<string>('CLIENT_DOMAIN', '');
  }

  // Built on first use so a missing Stripe key doesn't block app boot. The
  // secret now comes from env instead of being committed to source.
  private get stripe(): Stripe {
    if (!this.stripeClient) {
      const key = this.config.get<string>('STRIPE_SECRET_KEY', '');
      if (!key) {
        throw new InternalServerErrorException(
          'Stripe is not configured (set STRIPE_SECRET_KEY).',
        );
      }
      this.stripeClient = new Stripe(key);
    }
    return this.stripeClient;
  }

  async createCheckoutSession(dto: CreateCheckoutDto) {
    // Resolve name + price from the DB; never trust client-supplied amounts.
    const services = await this.prisma.service.findMany({
      where: { id: { in: dto.items.map((item) => item.serviceId) } },
    });
    const servicesById = new Map(services.map((s) => [s.id, s]));

    const lineItems: Stripe.Checkout.SessionCreateParams.LineItem[] =
      dto.items.map((item) => {
        const service = servicesById.get(item.serviceId);
        if (!service) {
          throw new NotFoundException(
            `Service ${item.serviceId} does not exist`,
          );
        }
        return {
          price_data: {
            currency: 'usd',
            product_data: { name: service.name },
            // service.price is in dollars; Stripe wants integer cents.
            unit_amount: Math.round(service.price * 100),
          },
          quantity: item.quantity,
        };
      });

    lineItems.push({
      price_data: {
        currency: 'usd',
        product_data: { name: 'site fees' },
        unit_amount: SITE_FEE_CENTS,
      },
      quantity: 1,
    });

    try {
      const session = await this.stripe.checkout.sessions.create({
        line_items: lineItems,
        mode: 'payment',
        success_url: this.clientDomain,
        cancel_url: this.clientDomain,
      });
      return { sessionUrl: session.url };
    } catch (error) {
      this.logger.error('Failed to create Stripe session', error as Error);
      throw new InternalServerErrorException('Unable to create Stripe session');
    }
  }
}
