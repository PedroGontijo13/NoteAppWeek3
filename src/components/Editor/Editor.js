import ReactMDE from "react-mde";
import * as Showdown from "showdown";
import { useState } from "react"
import "./Editor.css"

const Editor = (props) => {
    
    const [selectedTab, setSelectedTab] = useState("write");

    const converter = new Showdown.Converter({
        tables: true,
        simplifiedAutoLink: true,
        strikethrough: true,
        tasklists: true
    })
    
  return (
    <section className="pane editor">
        <ReactMDE 
            value={props.currentNote.body}
            onChange={props.updateNote}
            selectedTab={selectedTab}
            onTabChange={setSelectedTab}
            generateMarkdownPreview={(markdown) =>
                Promise.resolve(converter.makeHtml(markdown))
            }
            minEditorHeight={80}
            heightUnits="vh"
        />
    </section>
  )
}

export default Editor