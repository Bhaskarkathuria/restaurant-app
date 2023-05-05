const msg=document.querySelector('.msg')
const myform=document.querySelector('#My-form')
const priceInput=document.querySelector('#priceInput')
const dishInput=document.querySelector('#dishInput')
const tableSelect=document.querySelector('#tableSelect')
const table1=document.querySelector('#Table1')
const table2=document.querySelector('#Table2')
const table3=document.querySelector('#Table3')
const ordersummary=document.querySelector('#orderSummary')

//myform.addEventListener('submit',onSubmit);
myform.addEventListener('submit',savetocloud);
table1.addEventListener('click',removeitem);
table2.addEventListener('click',removeitem);
table3.addEventListener('click',removeitem);


function savetocloud(e){
e.preventDefault();

const price=priceInput.value;
const dish=dishInput.value;
const table=tableSelect.value;

const obj={price,dish,table}

axios.post("https://crudcrud.com/api/dc30801e2a0d4df4bd5017e6e3a8a653/restaurantData",obj)
.then((response)=>{
    console.log(response)
    let id;

    if(response.data.price===""|| response.data.dish==="select"|| response.data.table==="select"){

        msg.innerHTML="Please enter all Feilds!"
        setTimeout(()=>{
            msg.remove()
        },3000)

    }else
    {
        const li=document.createElement('li')
        li.setAttribute('id',response.data._id)
        id=response.data._id

        li.appendChild(document.createTextNode(`${response.data.price}Rs-${response.data.dish}-${response.data.table}`))

        if(response.data.table.value==="Table 1")
        {
            table1.appendChild(li)
        }
        if(response.data.table.value==="Table 2")
        {
            table2.appendChild(li)
        }
        if(response.data.table.value==="Table 3")
        {
            table3.appendChild(li)
        }

        const deletebtn=document.createElement('button');
    deletebtn.className='delete'
    deletebtn.appendChild(document.createTextNode('delete'));
    li.appendChild(deletebtn)

    }
    //console.log(id)



    
})

}


function removeitem(e){

if(e.target.classList.contains('delete'))
{
    if(confirm("Are you Sure!"))
    {
        const li=e.target.parentElement
        const id=li.id

        li.remove();
        //console.log(id)

        axios.delete(`https://crudcrud.com/api/dc30801e2a0d4df4bd5017e6e3a8a653/restaurantData/${id}`)
            .then((response) => {
                console.log(response);

            })
            .catch((err) => {
                console.log(err);
            });
        
        
    }
}

}

 window.addEventListener('DOMContentLoaded', () => {
      axios.get("https://crudcrud.com/api/dc30801e2a0d4df4bd5017e6e3a8a653/restaurantData")
          .then((response) => {
            // console.log(response);
              let id;           
                 for (let i = 0; i < response.data.length; i++) 
              {   const price=response.data[i].price;
                  const dish=response.data[i].dish;
                  const table=response.data[i].table;
                   const li = document.createElement('li');
                   li.setAttribute('id',response.data[i]._id)
                
                   id=response.data[i]._id

                   li.appendChild(document.createTextNode(`${price}Rs - ${dish} - ${table}`));

                

                   if (table === 'Table 1') {
                       table1.appendChild(li);
                   } else if (table === 'Table 2') {
                       table2.appendChild(li);
                   } else if (table === 'Table 3') {
                       table3.appendChild(li);
             }

                   const deleteBtn = document.createElement('button');
                   deleteBtn.className = 'delete';
                   deleteBtn.appendChild(document.createTextNode('Delete'));                  
                    li.appendChild(deleteBtn);

                   console.log(li)
                  console.log(price,dish,table)
              }     
          
    
          })
          .catch((err) => {
              console.log(err);
          });
  });
