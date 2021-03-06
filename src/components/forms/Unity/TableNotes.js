import React from 'react';
import MaterialTable from 'material-table';
import icons from './../../misc/TableIcons'
import "react-mde/lib/styles/css/react-mde-all.css";
import Mde from './../../misc/Editor'
export default function MaterialTableDemo({notes, callBackState}) {
  const [state, setState] = React.useState({    
    data: notes.length ? notes : [] // => array
  });

  const updateDataBody = (newData, row) =>{
    const data = [...state.data]
    data[row].markDown = newData
    setState({...state, data})
  }

  React.useEffect(()=> {
    if(state.data.length){
      callBackState(state.data)
    }
  }, [state])

  const editConfig = {
    onRowAdd: newData =>
      new Promise(resolve => {
        resolve();
        const data = [...state.data];
        data.push(newData);
        setState({ ...state, data });
      }),
    onRowUpdate: (newData, oldData) =>
      new Promise(resolve => {
        resolve();
        const data = [...state.data];
        data[data.indexOf(oldData)] = newData;
        setState({ ...state, data });
      }),
    onRowDelete: oldData =>
      new Promise(resolve => {
        resolve();
        const data = [...state.data];
        data.splice(data.indexOf(oldData), 1);
        setState({ ...state, data });
      }),
  }

  return (
    <MaterialTable
      icons={icons}
      title="Unity Notes"
      columns={[{ title: 'Note name', field: 'notesTitle' }]}
      data={state.data}
      detailPanel={rowData => <Mde data={rowData} callBackState={updateDataBody}/>}
      options={{actionsColumnIndex: -1}}
      editable={editConfig}
    />
  );
}