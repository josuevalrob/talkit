import React from 'react';
import MaterialTable from 'material-table';
import icons from './../../misc/TableIcons'
import "react-mde/lib/styles/css/react-mde-all.css";
import Mde from './../../misc/Editor'
export default function MaterialTableDemo({notes, callBackState}) {
  const [state, setState] = React.useState({    
    data: notes // => array
    /**
     * { 
        notesTitle: 'Zerya Betül',
        markDown: '# This is a heading\n\nThis is a paragraph with [a link](http://www.disney.com/) in it.',
      }
     */
  });

  const updateDataBody = (newData) =>{
    console.log(newData) //newData is an OBject
    /**
     * newData
     * { 
        notesTitle: 'Zerya Betül',
        markDown: '# This a://www.disney.com/) in it.',
      }
     */
  }

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
        }, 300);
      }),
    onRowUpdate: (newData, oldData) =>
      new Promise(resolve => {
        setTimeout(() => {
          resolve();
          const data = [...state.data];
          data[data.indexOf(oldData)] = newData;
          setState({ ...state, data });
        }, 300);
      }),
    onRowDelete: oldData =>
      new Promise(resolve => {
        setTimeout(() => {
          resolve();
          const data = [...state.data];
          data.splice(data.indexOf(oldData), 1);
          setState({ ...state, data });
        }, 300);
      }),
  }

  // console.log(state)
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