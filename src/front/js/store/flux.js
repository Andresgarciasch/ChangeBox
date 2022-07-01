const getState = ({ getStore, getActions, setStore }) => {
  return {
    store: {
      message: null,
      demo: [
        {
          title: "FIRST",
          background: "white",
          initial: "white",
        },
        {
          title: "SECOND",
          background: "white",
          initial: "white",
        },
      ],
    },
    actions: {
      // Use getActions to call a function within a fuction
      // exampleFunction: () => {
      //   getActions().changeColor(0, "green");
      // },

      getMessage: () => {
        // fetching data from the backend
        fetch(process.env.BACKEND_URL + "/api/hello")
          .then((resp) => resp.json())
          .then((data) => setStore({ message: data.message }))
          .catch((error) =>
            console.log("Error loading message from backend", error)
          );
      },
      changeColor: (index, color) => {
        //get the store
        const store = getStore();

        //we have to loop the entire demo array to look for the respective index
        //and change its color
        const demo = store.demo.map((elm, i) => {
          if (i === index) elm.background = color;
          return elm;
        });

        //reset the global store
        setStore({ demo: demo });
      },

      registerUser: async (data) => {
        console.log(data);
        try {
          const response = await fetch(
            `${process.env.BACKEND_URL}/api/register-user`,
            {
              method: "POST",
              body: JSON.stringify(data),
              headers: { "Content-Type": "application/json" },
            }
          );

          if (response.ok) {
            const body = await response.json();
            setStore({
              currentuser: body.user,
            });
            return true;
          }
          return false;
        } catch (error) {
          console.log(error);
        }
      },

      validationUser: async (data) => {
        // validationUser: async (id, data) => {
        try {
          const response = await fetch(
            // `${process.env.BACKEND_URL}/validation-user/${id}`,
            `${process.env.BACKEND_URL}/api/validation-user/`,
            {
              headers: {
                "Content-Type": "application/json",
              },
              method: "PUT",
              body: JSON.stringify({
                id: getStore().currentuser.id,
                data: data,
              }),
            }
          );
          if (response.ok) {
            // getActions().getEpisodes();
            return true;
          }
        } catch (error) {
          console.log(error);
        }
      },

      loginUser: async (data) => {
        try {
          let response = await fetch(`${process.env.BACKEND_URL}/api/login`, {
            headers: {
              "Content-Type": "application/json",
            },
            method: "POST",
            body: JSON.stringify(data),
          });
          if (response.ok) {
            let data = await response.json();
            localStorage.setItem("token", data.token);
            return true;
          } else return false;
        } catch (error) {
          console.log(error);
        }
      },
    },
  };
};

export default getState;
