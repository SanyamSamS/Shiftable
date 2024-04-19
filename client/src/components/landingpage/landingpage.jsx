// import { useState } from 'react';
// import { Tabs, TabsList, TabsTrigger, TabsContent } from '@your-component-library'; // assumign we use shadcn/ui library
import EmployeeSignUpForm from "../signup/employeeSignup";
import EmployeeLoginForm from "../login/employeeLogin";

const LandingPage = () => {
//   temporary code to test the form

  return (
    <div>
      <h1>Shiftable</h1>
        <div className="grid w-full grid-cols-2">
          <button value="login">Log In</button>
          <button value="signup">Sign Up</button>
        </div>

        <div value="login">
          <EmployeeLoginForm />
        </div>

        <div value="signup">
          <EmployeeSignUpForm />
        </div>
      </div>
    // </div>
  );
};

export default LandingPage;


// const LandingPage = () => {
//   const [activeTab, setActiveTab] = useState('login');

//   return (
//     <div>
//       <h1>Shiftable</h1>
//       <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="w-[400px]">
//         <TabsList className="grid w-full grid-cols-2">
//           <TabsTrigger value="login">Log In</TabsTrigger>
//           <TabsTrigger value="signup">Sign Up</TabsTrigger>
//         </TabsList>

//         <TabsContent value="login">
//           <EmployeeLoginForm />
//         </TabsContent>

//         <TabsContent value="signup">
//           <EmployeeSignUpForm />
//         </TabsContent>
//       </Tabs>
//     </div>
//   );
// };