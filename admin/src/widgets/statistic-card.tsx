export function StatisticCard({ heading, data, icon }: { heading: string; data: string; icon: React.ReactNode }) {
  return (
    <div className="bg-green rounded-lg text-white py-[20px] gap-[20px] px-[30px] w-full flex flex-col items-center shadow-black shadow-xl">
      <p>{heading}</p>
      <div className="w-full flex justify-center gap-[20px] items-center">
        <div className="size-[40px] flex items-center justify-center">{icon}</div>
        <p className="text-3xl">{data}</p>
      </div>
    </div>
  )
}
