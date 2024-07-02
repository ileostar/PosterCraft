import React, {useState} from "react"
import Footer from "../components/Footer"

React.useLayoutEffect = React.useEffect

export default function DefaultLayout({children}: {children: React.ReactNode}) {
  return (
    <div>
			<main className="font-sans px-4 py-10 text-center text-gray-700 dark:text-gray-200">
				{children}
				<Footer/>
			</main>
		</div>
  );
}