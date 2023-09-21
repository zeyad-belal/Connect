
export default function LoadingItemCard() {
  return (
    <div className="flex justify-center ">
    <div className="animate-pulse  h-[230px] w-[300px] border border-gray-300 shadow rounded-md p-1 max-w-sm  ">
      <div className="rounded-sm bg-gray-300 h-[60%] w-full"></div>
      <div className="flex-1 mt-3 space-y-2 py-1 px-2">
        <div className="h-2 bg-gray-300 max-w-[95%] rounded"></div>
        <div className="space-y-3">
          <div className="h-2 bg-gray-300 max-w-[80%]  rounded"></div>
          <div className="h-2 bg-gray-300 max-w-[30%] rounded"></div>
          <div className="h-2 bg-gray-300 max-w-[50%] rounded"></div>
        </div>
      </div>
    </div>
  </div>
  )
}
