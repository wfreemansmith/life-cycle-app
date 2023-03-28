<script>
import FaAlignJustify from 'svelte-icons/fa/FaAlignJustify.svelte'
import {onMount} from "svelte"
onMount(() => {
    let toggleBtn = document.querySelector("#navbar-toggle");
    let collapse = document.querySelector("#navbar-collapse");

toggleBtn.onclick = () => {
collapse.classList.toggle("hidden");
collapse.classList.toggle("flex");
}})
</script>

  
    
    <nav class="nav py-2 h-fit w-[99vw] md:py-4 bg-gradient-to-r from-[#F2B39D] via-[#97C9E8] to-[#CD87E8]">
      
      <div class="container px-4 mx-auto md:flex md:items-center"> 
        <div class="flex justify-between items-center">
          <a href="#" class="font-bold text-xl text-gray-800">LOGO GOES HERE</a>
          <button class="icon border hover:bg-gradient-to-r hover:from-[#F2B39D] hover:via-[#97C9E8] hover:to-[#CD87E8] border-solid border-gray-600 px-3 py-1 rounded text-gray-600 opacity-50 hover:opacity-75 md:hidden w-10 h-10" id="navbar-toggle">
            <FaAlignJustify />
          </button>
        </div>
    
        <div class="hidden md:flex flex-col md:flex-row md:ml-auto mt-3 md:mt-0" id="navbar-collapse">
          <a href="#" class="hover:bg-gradient-to-r hover:from-[#F2B39D] hover:via-[#97C9E8] hover:to-[#CD87E8] p-2 lg:px-4 md:mx-2 text-gray-600 rounded hover:bg-[#CD87E8] hover:text-gray-700 transition-colors duration-300 justify-items-center">Home</a>
          <a href="#" class="hover:bg-gradient-to-r hover:from-[#F2B39D] hover:via-[#97C9E8] hover:to-[#CD87E8] p-2 lg:px-4 md:mx-2 text-gray-600 rounded hover:bg-[#CD87E8] hover:text-gray-700 transition-colors duration-300">Account</a>
          <a href="#" class="hover:bg-gradient-to-r hover:from-[#F2B39D] hover:via-[#97C9E8] hover:to-[#CD87E8] p-2 lg:px-4 md:mx-2 text-gray-600 rounded hover:bg-[#CD87E8] hover:text-gray-700 transition-colors duration-300">Settings</a>
          <a href="#" class="hover:bg-gradient-to-r hover:from-[#F2B39D] hover:via-[#97C9E8] hover:to-[#CD87E8] p-2 lg:px-4 md:mx-2 text-gray-600 rounded hover:bg-[#CD87E8] hover:text-gray-700 transition-colors duration-500">Contact</a>
        </div>
      </div>
  </nav>


<style>
</style>