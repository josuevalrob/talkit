import React, {useEffect} from 'react';
import MaterialTable from 'material-table';
import icons from './../../misc/TableIcons'
import ReactMde from "react-mde";
import "react-mde/lib/styles/css/react-mde-all.css";
import * as Showdown from "showdown";

export default function MaterialTableDemo(props) {
  const [state, setState] = React.useState({
    columns: [
      { title: 'Note name', field: 'notesTitle' },      
    ], 
    data: props.data.body.notes
  });

  useEffect(()=>{
    // props.updateNotes(state.data)
    // console.log('usingeffect')
  })
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

  return (
    <MaterialTable
      icons={icons}
      title="Unity Notes"
      columns={state.columns}
      data={state.data}
      // actions={actions && actions}
      detailPanel={rowData => <Mde data={rowData.markDown} />}
      options={{actionsColumnIndex: -1}}
      editable={editConfig}
    />
  );
}

const Mde = ({data}) => {
  const [value, setValue] = React.useState(data);
  const [selectedTab, setSelectedTab] = React.useState("preview");
  
  return (  
    <ReactMde
      value={value}
      onChange={setValue}
      selectedTab={selectedTab}
      onTabChange={setSelectedTab}
      generateMarkdownPreview={markdown =>
        Promise.resolve(converter.makeHtml(markdown))
      }
    />
  )
}

// * ReactMde
const converter = new Showdown.Converter({
  tables: true,
  simplifiedAutoLink: true,
  strikethrough: true,
  tasklists: true
});
  // const actions=[{
  //   icon: Save,
  //   tooltip: 'Save User',
  //   onClick: (event, rowData) => alert("You saved " + rowData.name)
  // }]