import React from 'react';
import ReactMde from "react-mde";
import * as Showdown from "showdown";

const Mde = ({data, callBackState}) => {
  const [value, setValue] = React.useState(data.markDown);
  const [selectedTab, setSelectedTab] = React.useState(data.markDown ? "preview" : "write");
  
  React.useEffect(()=> callBackState(value, data.tableData.id), [value, callBackState, data.tableData.id])

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
  

export default Mde