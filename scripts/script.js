function hideItems() {
  const display = document.getElementById("display");
  display.classList.add("hidden");
}
const loadPhone = async (searchText,isShowAll) => {
  const response = await fetch(
    `https://openapi.programming-hero.com/api/phones?search=${searchText}`
  );
  const data = await response.json();
  const phones = data.data;
  displayPhones(phones,isShowAll);
  console.log(phones);
};


const displayPhones = (phones,isShowAll) => {
    const phoneContainer=document.getElementById("phone-container");
    phoneContainer.innerText=` `;
    
    const numberOfPhones=phones.length;
    if (numberOfPhones>12 && !isShowAll) {
        document.getElementById('show-all-button').classList.remove('hidden');
    }else{
        document.getElementById('show-all-button').classList.add('hidden');
    }
    console.log(isShowAll);
    if (!isShowAll) {
        phones=phones.slice(0,12);
    }
    
    
  phones.forEach((phone) => {
    console.log(phone);
    const phoneCard = document.createElement("div");
    phoneCard.classList = "card w-auto bg-base-100 shadow-xl py-4";
    phoneCard.innerHTML = `
    <figure class="px-10 pt-10">
    <img src="${phone.image}" alt="Shoes" class="rounded-xl" />
  </figure>
  <div class="card-body items-center text-center">
    <h2 class="card-title">${phone.phone_name}</h2>
    <p>There are many variations of passages of available, but the majority have suffered</p>
    <p>999</p>
    <div class="card-actions">
      <button onclick="handleShowDetails('${phone.slug}')" class="btn btn-primary">Show Details</button>
    </div>
  </div>`;
  phoneContainer.appendChild(phoneCard);
  });
  loadingSpinner(false);
};

const handleShowDetails= async(id)=>{
console.log('handled');
console.log(id);
const response=await fetch(`https://openapi.programming-hero.com/api/phone/${id}`)
 const data=await response.json();
//  console.log(data);
 const phone=data.data;
//  console.log(data);
 showDetails(phone);
 console.log(phone);

};
const getValueById= (Id)=> {
   const searchText=  document.getElementById(Id).value;
   return searchText;
}
const handleSearch=(isShowAll)=>{
    loadingSpinner(true);
    console.log('searched');
   const searchValue= getValueById("search-box");
   console.log(searchValue);
   loadPhone(searchValue,isShowAll);
   
   


}
const loadingSpinner=(isLoading)=>{
    const spinner=document.getElementById('loading-spinner');
    if (isLoading) {
        spinner.classList.remove('hidden');
    }else{
        spinner.classList.add('hidden')
    }
    
}
const handleShowAll=()=>{
handleSearch(true);

}
const showDetails=(phone)=>{
  console.log(phone);
  const phoneName=document.getElementById('phone-name');
  phoneName.innerText=phone.name;
  console.log(phone.name);
  my_modal_5.showModal();

  const phoneDetailsContainer=document.getElementById('show-detail-container');
console.log(phone.image);
  phoneDetailsContainer.innerHTML=`
  <img src="${phone.image}" alt="">

        <h3 id="phone-name" class="font-bold text-lg"></h3>
        <p> <span>Storage:${phone.mainFeatures.storage}</span>
         </p>
        
  `

}


