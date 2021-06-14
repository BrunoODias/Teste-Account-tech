$(document).ready(function(){
    function toggleFAB(fab){
        if(document.querySelector(fab).classList.contains('show')){
          document.querySelector(fab).classList.remove('show');
      }else{
          document.querySelector(fab).classList.add('show');
      }
    }
    
    document.querySelector('.fab .main').addEventListener('click', function(){
        toggleFAB('.fab');
        $('.fab > .main').toggleClass('rotate-180');
    });
    
    document.querySelectorAll('.fab ul li button').forEach((item)=>{
        item.addEventListener('click', function(){
            toggleFAB('.fab');
        });
    });
});