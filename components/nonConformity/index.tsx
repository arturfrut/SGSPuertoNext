import { Form502 } from "../captainForms/form502"
import { NonConformityCard } from "./nonConformityCard"

export const NonCoformity = () => {
  return ( 
        <div className='h-full lg:px-6'>
      <div className='flex justify-center gap-4 xl:gap-6 pt-3  lg:px-0  flex-wrap xl:flex-nowrap sm:pt-10 max-w-[90rem] mx-auto w-full'>
        <div className='mt-6 gap-6 flex flex-col w-full'>
          {/* Card Section Top */}
          <div className='flex flex-col gap-5'>
            <div className='flex justify-center w-full gap-5'>
              <NonConformityCard />
            </div>
            <div className='grid md:grid-cols-2 grid-cols-1 2xl:grid-cols-3 gap-5  justify-center w-full'>
              <Form502 />
              <Form502 />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
  
}

// import { Form502 } from '../captainForms/form502'
// import { AccidentReportCard } from './accidentReportCard'

// export const AccidentReports = () => {
//   return (
//     <div className='h-full lg:px-6'>
//       <div className='flex justify-center gap-4 xl:gap-6 pt-3  lg:px-0  flex-wrap xl:flex-nowrap sm:pt-10 max-w-[90rem] mx-auto w-full'>
//         <div className='mt-6 gap-6 flex flex-col w-full'>
//           {/* Card Section Top */}
//           <div className='flex flex-col gap-5'>
//             <div className='flex justify-center w-full gap-5'>
//               <AccidentReportCard />
//             </div>
//             <div className='grid md:grid-cols-2 grid-cols-1 2xl:grid-cols-3 gap-5  justify-center w-full'>
//               <Form502 />
//               <Form502 />
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }
