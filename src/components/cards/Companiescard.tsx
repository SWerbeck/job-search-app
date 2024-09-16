import { Link } from "react-router-dom";


const Companiescard = ({companyName}) => {
  return (
    <>
      {/* <div className="bg-headline h-20 w-50 border-spacing-x-5 border border: mx-3 border-white">
               <h2 className="text-white text-4xl">COMPANIES</h2>
            </div> */}
      <div className="bg-mainbody h-10 w-50 border-spacing-x-7 border border: mx-3 border-white">
        
                <Link><p className="text-white text-2xl mx-5">{companyName}</p></Link>
                <div className="flex-auto items-end">
               
                </div>
            </div>
      
    </> 
  );
};

export default Companiescard;