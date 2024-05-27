/* eslint-disable @typescript-eslint/prefer-as-const */
import { Backdrop, Fade, Modal, Typography } from "@mui/material";
import React from "react";
import { CSSProperties } from "react";
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  headingText: string;
  style?: CSSProperties;
  contentText?: string;
  component?: React.ReactNode;
}

function PHModal(props: ModalProps) {
  return (
    <>
      <Modal
        open={props.isOpen}
        onClose={props.onClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={props.isOpen}>
          <div
            className={`p-4 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 shadow-2xl rounded-lg bg-white ${
              !props.style?.width && "container"
            }`}
            style={props.style}
          >
            <Typography
              variant="h5"
              component="h2"
              style={{ marginBottom: "1rem" }}
            >
              {props.headingText}
            </Typography>
            {props.contentText && (
              <Typography sx={{ mt: 2 }}>{props.contentText}</Typography>

            )}
            {props.component && props.component}
          </div>
        </Fade>
      </Modal>
    </>
  );
}

export default PHModal;
