// import styled from 'styled-components';
// import React from 'react';
// import { useState } from 'react';
// // interface TabListsProps {
// //     tabs: {
// //         id: number;
// //         name: string;
// //         selected: boolean 
// //     }[];
// //     handleChange: (id: number) => void;
// // }
// // interface TabProps {
// //     selected: boolean;
// // }


// const [activeTab, setActiveTab] = useState<number>(0);
// const handleTabClick = (index: number) => {
//   setActiveTab(index);
// };
// const renderTabs = () => {
//   return (
//     <div>
//       <div onClick={() => handleTabClick(0)}>Tab 1</div>
//       <div onClick={() => handleTabClick(1)}>Tab 2</div>
//       <div onClick={() => handleTabClick(2)}>Tab 3</div>
//     </div>
//   );
// };
// const renderTabContent = () => {
//   switch (activeTab) {
//     case 0:
//       return <div>가나다라</div>;
//     case 1:
//       return <div>1234</div>;
//     case 2:
//       return <div>ABCD</div>;
//     default:
//       return null;
//   }
// };



// const TabLists = () => {

//     return (
//         <Container>
//             <Tab>
//             {/* {renderTabs()}
//       {renderTabContent()} */}
//             </Tab>
//         </Container>
//     );
// };

// export default TabLists;

// const Container = styled.div`
//     width: 100%;
//     display: flex;
//     justify-content: space-evenly;
//     margin: 1rem 0;
//     max-width: 800px;
// `

// const Tab = styled.div`
//     width: 45%;
//     max-width: 380px;
//     height: 2.5rem;
//     background-color: skyblue;
//     border: none;
//     cursor: pointer;
//     font-size: 10px;

//     :hover {
//         background-color: blue;
//     }
//     .span {
//         width: 100%;
//     }
//     @media (min-width:800px) {
//         width: 450px;
//         justify-content: center;
//     }
// `