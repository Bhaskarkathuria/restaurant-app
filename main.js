const msg=document.querySelector('.msg')
const myform=document.querySelector('#My-form')
const priceInput=document.querySelector('#priceInput')
const dishInput=document.querySelector('#dishInput')
const tableSelect=document.querySelector('#tableSelect')
const table1=document.querySelector('#Table1')
const table2=document.querySelector('#Table2')
const table3=document.querySelector('#Table3')
const ordersummary=document.querySelector('#orderSummary')

myform.addEventListener('submit',onSubmit);
table1.addEventListener('click',removeitem)
table2.addEventListener('click',removeitem)
table3.addEventListener('click',removeitem)


function onSubmit(e){
    e.preventDefault();

    if(priceInput.value==="" || dishInput.value==="select" || tableSelect.value==="select"){
        msg.innerHTML="Please select all feilds"
        setTimeout(()=>{
            msg.remove()
        },3000)
    }else
    {
        const li=document.createElement('li')


        li.appendChild(document.createTextNode(`${priceInput.value}Rs - ${dishInput.value} - ${tableSelect.value}`))

        if(tableSelect.value==="Table 1")
        {
            table1.appendChild(li)
        }if(tableSelect.value==="Table 2")
        {
            table2.appendChild(li)
        }if(tableSelect.value==="Table 3")
        {
            table3.appendChild(li)
        }

           const deletebtn=document.createElement('button');
    deletebtn.className='delete';
    deletebtn.appendChild(document.createTextNode('Delete'));
    li.appendChild(deletebtn)
    }

 

}

function removeitem(e){
    if(e.target.classList.contains('delete'))
    {
        if (confirm("Are you sure"))
        {
            e.target.parentElement.remove();
        }
    }

}