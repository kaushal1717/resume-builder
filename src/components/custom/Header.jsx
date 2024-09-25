import { Link } from "react-router-dom";
import { Button } from "../ui/button";

function Header() {
  return (
    <div className='p-3 px-5 flex justify-between shadow-md'>
      <Link to={"/"}>
        <img src='/logo.svg' width={50} height={50} />
      </Link>
      <div className='flex gap-2 items-center'>
        <Link to={"/dashboard"}>
          <Button variant='outline'>DashBoard</Button>
        </Link>
      </div>
    </div>
  );
}

export default Header;
