import React, {useEffect, useState} from "react";

function App() {
    const [data, setData] = useState([{}]);

    useEffect(() => {
        fetch('https://localhost:5000/api')
            .then(res =>
                res.json()
            )
            .then(res =>
                setData(res)
            )
    }, [])

    console.log(data)

    return (
      <div>
          {data.users.map((user, i) => (
              <p key={i}>{user}</p>
              ))}
      </div>
    )
}

export default App;