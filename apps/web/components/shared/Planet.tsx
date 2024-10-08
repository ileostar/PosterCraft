export default function Planet() {
  return (
    <div className="-mr-[36vh] animate-[spin_60s_linear_infinite] flex relative justify-center items-center w-[50vh] h-[50vh] md:w-[70vh] md:h-[70vh] border-[3px] border-red-200 dark:border-[#FF33DE]/30 rounded-full badge badge-primary badge-lg bg-transparent">
      <div className="absolute -top-3 h-6 w-6 bg-red-100 dark:bg-[#FF33DE]/15 rounded-full animate-pulse"></div>
      <div className="absolute -top-2 right-20 h-7 w-7 bg-red-200 dark: dark:bg-[#FF33DE]/15 rounded-full animate-pulse"></div>
      <div className="absolute -left-5 h-10 w-10 bg-red-200 dark:bg-[#FF33DE]/15 rounded-full"></div>
      <div className="absolute -top-3 h-6 w-6 bg-red-300 dark:bg-[#FF33DE]/35 rounded-full animate-pulse"></div>
      <div className="absolute -bottom-3 h-6 w-6 bg-red-200 dark:bg-[#FF33DE]/25 rounded-full animate-pulse"></div>
      <div className="absolute bottom-12 left-8 h-8 w-8 bg-red-100  dark:bg-[#FF33DE]/15 rounded-full"></div>
      <div className="absolute bottom-10 right-10 h-5 w-5 bg-red-200 dark:bg-[#FF33DE]/25 rounded-full"></div>
      <div className="absolute top-15 right-15 h-10 w-10 bg-red-200 dark:bg-[#FF33DE]/25 rounded-full"></div>
      <div className="flex justify-center items-center w-[40vh] h-[40vh] md:w-[52vh] md:h-[52vh] bg-red-200 dark:bg-[#FF33DE]/25 w-25 h-25 rounded-full">
        <div className="w-[20vh] h-[20vh] md:w-[35vh] md:h-[35vh] bg-red-100 dark:bg-black rounded-full"></div>
      </div>
    </div>
  );
}
