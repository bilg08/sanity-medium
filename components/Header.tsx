import Link from "next/link";

function Header() {
    return (
      <header className="flex p-5 items-center space-x-5 justify-between">
        {/*left*/}
          <div className="flex items-center space-x-5">
            <Link href="/">
              <img
                className="w-44 object-contain"
                src="https://upload.wikimedia.org/wikipedia/commons/0/0d/Medium_%28website%29_logo.svg"
                alt=""
              />
            </Link>
            <div className="hidden md:inline-flex items-center space-x-5">
              <h1>About</h1>
              <h1>Contact</h1>
              <h1 className="text-white bg-green-600 px-4 py-1 rounded-full">Follow</h1>
            </div>
            
          </div>
        {/****************************************************/}

        {/*right*/}
          <div className="flex items-center space-x-5 text-green-600">
               <h1>Sign in</h1>
               <h1 className="border px-4 py-1 rounded-full border-green-600">Get Started</h1>
          </div>
        {/****************************************************/}
      </header>
    );
}
export default Header;