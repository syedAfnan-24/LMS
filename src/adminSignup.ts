const signup = document.getElementById("adminSignup")! as HTMLFormElement;

signup.addEventListener("submit",function(event: Event){
    event.preventDefault();

    const adminName = (document.getElementById("aname")! as HTMLInputElement).value;
    const adminPass = (document.getElementById("apass")! as HTMLInputElement).value;

    const admin = {
        adminName : adminName,
        password : adminPass
    }

    localStorage.setItem("admin",JSON.stringify(admin));
    alert("sign up successful")

    signup.reset();
})