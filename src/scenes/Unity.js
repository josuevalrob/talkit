import React from 'react';
import UnityService from './../services/UnityServices'
import UnityForm from './../components/forms/Unity/UnityForm'
function Unity(props) {
  const [data, setData] = React.useState({})
  const {uid} = props.match.params


  const fetchData = async () => {
      const response = await UnityService.getUnity(uid)
      setData(response) // {...}
  }

  React.useEffect(() => { fetchData() }, [])

  return (
    <div className="Unity">
      <UnityForm  { ...props }/>
    </div>
  );
}

export default Unity;
