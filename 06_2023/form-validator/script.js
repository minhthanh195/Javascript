const form = document.getElementById('form')
const passwordEl = document.getElementById('password')
const passwordConfirm = document.getElementById('confirm-password')
const messContainer = document.querySelector('.message-container')
const mess = document.getElementById('message')

let isValid = false
let passwordMatch = false
// validate
    function validateForm(){
        isValid = form.checkValidity();
        if(!isValid){
            mess.textContent = 'hoangminhthanh'
            messContainer.style.color = 'red'
            messContainer.style.borderColor = 'red'
            return;
        }
        // check password match 
        if(passwordEl.value === passwordConfirm.value ){
            passwordMatch = true;
            passwordEl.style.borderColor = 'green'
            passwordConfirm.style.borderColor = 'green'
        }else{
            passwordMatch = false;
            passwordEl.style.borderColor = 'red'
            passwordConfirm.style.borderColor = 'red'
            mess.textContent = 'Make sure passwords match'
            mess.style.color = 'red'
            messContainer.style.color = 'red'
            messContainer.style.borderColor = 'red'
            return;
        }
        if(isValid && passwordMatch){
            mess.textContent = 'OK'
            mess.style.color = 'green'
            messContainer.style.color = 'green'
            messContainer.style.borderColor = 'green'
        }
    }
    // store form date 
    function storeFormData (){
        const user = {
            name : form.name.value,
            phone : form.phone.value,
            email : form.email.value,
            website : form.website.value,
            password : form.password.value,
        };
        console.log(user)
    }
// 
function processFormData(e){
    e.preventDefault()
    validateForm()
    // submit data if valid
    if(isValid && passwordMatch){
        storeFormData ()
    }
}
// add event listener 
form.addEventListener('submit',processFormData)