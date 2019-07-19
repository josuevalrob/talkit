import React from 'react';
import MaterialTable from 'material-table';
import icons from './../../misc/TableIcons'
import "react-mde/lib/styles/css/react-mde-all.css";
import Mde from './../../misc/Editor'
export default function MaterialTableDemo({notes, callBackState}) {
  const [state, setState] = React.useState({    
    data: notes //
  });

  React.useEffect(()=>{
    callBackState(state.data)
    console.log(state.data)
  },[state])

  const editConfig = {
    onRowAdd: newData =>
      new Promise(resolve => {
        setTimeout(() => {
          resolve();
          const data = [...state.data];
          data.push(newData);
          setState({ ...state, data });
        }, 600);
      }),
    onRowUpdate: (newData, oldData) =>
      new Promise(resolve => {
        setTimeout(() => {
          resolve();
          const data = [...state.data];
          data[data.indexOf(oldData)] = newData;
          setState({ ...state, data });
        }, 600);
      }),
    onRowDelete: oldData =>
      new Promise(resolve => {
        setTimeout(() => {
          resolve();
          const data = [...state.data];
          data.splice(data.indexOf(oldData), 1);
          setState({ ...state, data });
        }, 600);
      }),
  }

  // console.log(state)
  return (
    <MaterialTable
      icons={icons}
      title="Unity Notes"
      columns={[{ title: 'Note name', field: 'notesTitle' }]}
      data={state.data}
      detailPanel={rowData => <Mde data={rowData.markDown} />}
      options={{actionsColumnIndex: -1}}
      editable={editConfig}
    />
  );
}