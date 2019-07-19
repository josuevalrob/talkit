import React from 'react';
import ReactMde from "react-mde";
import * as Showdown from "showdown";



const Mde = ({data, callBackState}) => {
  const [value, setValue] = React.useState(data.markDown);
  const [selectedTab, setSelectedTab] = React.useState("preview");
  
  React.useEffect(()=>{
    callBackState({ 
        notesTitle: data.notesTitle,
        markDown: value,
    })
  }, [value])

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