// three data type need to create
		// 1. [key,key,key...,key]
		// 2. localStorage{"stickies",[key,key,key...,key]}
		// 3. localStorage{"key","[value,color]"}{"key",[value,color]}{"key",[value,color]}

		window.onload = init;

		function init(argument) {
			//get element and set event for btn
			var btn = document.getElementById('btn');
			btn.onclick = addStickyToDOM;
			// get stickiesArray from LocalStorage
			var stickies = JSON.parse(localStorage.getItem("stickies"));

			//print every sticky on Sticky-Wall
			if(stickies){
				for(var i=0;i<stickies.length;i++){
					var ul = document.getElementById("stickies");
					var li = document.createElement("li");
					var stickyArray = JSON.parse(localStorage.getItem(stickies[i]));
					li.innerHTML = stickyArray["value"];
					li.setAttribute("id",stickies[i]);//set attribute to li
					ul.appendChild(li);

					//set color for historic sticky
					selectBacGroundColor(stickies[i],stickyArray["color"]);

				}
			}
				
		}

		function addStickyToDOM() {
			//get ul、text element
			var value = document.getElementById("text").value;
			var ul = document.getElementById("stickies");
			
			// console.log(selectColor);
			//create li element and input attribute into it
			var sticky  = document.createElement("li");
			//create unique key 
			var random_num = new Date().getTime();
			var key = "sticky_" + random_num;
			console.log(key);

			sticky.setAttribute("id",key);

			//insert to DOM and select color for sticky
			ul.appendChild(sticky);
			sticky.innerHTML = value;
			//sticky bac-color change
			var color = selectBacGroundColor(key,"");
			
			//input key、value into LocalStorage
			var stickiesArray = saveStickyToLocalStorage(key,value,color);
			console.log(stickiesArray);

		}

		function saveStickyToLocalStorage(key,value,color) {
			// 1. [key,key,key...,key]
			var stickies = JSON.parse(localStorage.getItem("stickies"));  

			//judge stickies been or not
			if(!stickies){
				var stickies = [key];
			}else{
				stickies.push(key);
			}

			//2. localStorage{"stickies",[key,key,key...,key]}
			localStorage.setItem("stickies",JSON.stringify(stickies));


			//3.localStorage{"key",{}}{"key",{}}{"key",{}}
			var stickyObj = {
				"value": value,
				"color": color
			}

			localStorage.setItem(key,JSON.stringify(stickyObj));

			return stickies;

		}

		function selectBacGroundColor(key, color){
			
			var selectColor = color;
			if(!selectColor){
				var selectColor = document.getElementById("selectColor").value;
			}

			switch(selectColor) {
			    case "yellow":
			        document.getElementById(key).style.backgroundColor = "#FFBD33";
			        break;
			    case "red":
			        document.getElementById(key).style.backgroundColor = "#FFC8B4";
			        break;
			    case "green":
			        document.getElementById(key).style.backgroundColor = "#CCFF99";
			        break;
			    case "blue":
			        document.getElementById(key).style.backgroundColor = "#CCEEFF";
			}

			return selectColor;
		}