import React, { useEffect, useState } from "react";
 
const Title = (props) => (
 <tr>
   <td>{props.title.title}</td>
   <td>{props.title.century}</td>
   <td>{props.title.url}</td>
 </tr>
);

export default function TitleList() {
 const [titles, setTitles] = useState([]);
 
 // This method fetches the records from the database.
 useEffect(() => {
   async function getTitles() {
     const response = await fetch(`http://localhost:5000/browse/`);
 
     if (!response.ok) {
       const message = `An error occurred: ${response.statusText}`;
       window.alert(message);
       return;
     }
 
     const titles = await response.json();
     setTitles(titles);
   }
 
   getTitles();
 
   return;
 }, [titles.length]);
  
 // This method will map out the records on the table
 function titleList() {
   return titles.map((title) => {
     return (
       <Title
         title={title}
         key={title._id}
       />
     );
   });
 }
 
 // This following section will display the table with the records of individuals.
 return (
   <div>
     <h3>Treatises</h3>
     <table className="table table-striped" style={{ marginTop: 20 }}>
       <thead>
         <tr>
           <th>Title</th>
           <th>Century</th>
           <th>URL</th>
         </tr>
       </thead>
       <tbody>{titleList()}</tbody>
     </table>
   </div>
 );
}