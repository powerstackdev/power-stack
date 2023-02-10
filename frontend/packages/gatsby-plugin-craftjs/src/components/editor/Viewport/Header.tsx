/** @jsx jsx */

import { jsx, Button } from "theme-ui"
import { useEditor } from '@craftjs/core';
import { FiCornerUpLeft, FiCornerUpRight, FiCheck, FiEdit2 } from "react-icons/fi"


export const Header = () => {
  const { enabled, canUndo, canRedo, actions } = useEditor((state, query) => ({
    enabled: state.options.enabled,
    canUndo: query.history.canUndo(),
    canRedo: query.history.canRedo(),
  }));

  return (
      <header
        sx={{
          display: 'flex',
          alignItems: 'center',
          variant: 'styles.header',
        }}>
            <Button 
              sx={{
                marginRight: "10px",
                cursor: !canUndo ? "not-allowed" : "pointer" ,
                opacity:!canUndo ? "0.5" : "1",
                svg: {
                  width: "20px",
                  height: "20px",
                }
              }} 
              disabled={!canUndo} onClick={() => actions.history.undo()}>
              <FiCornerUpLeft />
            </Button>
            <Button
              sx={{
                marginRight: "10px",
                cursor: !canRedo ? "not-allowed" : "pointer" ,
                opacity:!canRedo ? "0.5" : "1",
                svg: {
                  width: "20px",
                  height: "20px",
                }
              }}
              disabled={!canRedo} onClick={() => actions.history.redo()}>
              <FiCornerUpRight />
            </Button>
        <div sx={{ mx: 'auto' }} />
          <Button
            sx={{
              display: "flex",
              alignItems: "center",
              padding: "5px 15px",
              borderRadius: "3px",
              color: "#fff",
              background: enabled ? 'green' : 'orange',
              svg: {
                mr: "6px",
                width: "20px",
                height: "20px",
                opacity: "0.9"
              }
            }}
            onClick={() => {
              actions.setOptions((options) => (options.enabled = !enabled));
            }}
          >
            {enabled ? <FiCheck /> : <FiEdit2 />}
            {enabled ? 'Finish Editing' : 'Edit'}
          </Button>
      </header>
  );
};
