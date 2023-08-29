import React, { createContext, useContext, useState } from "react";
import { Typography, Box, Modal } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import theme from "theme";
import DangerButton from "components/buttons/DangerButton";
import PrimaryButton from "components/buttons/PrimaryButton";
import { emptyCart } from "state/site";
const ModalContext = createContext();

export const useModalContext = () => useContext(ModalContext);

export const DeleteCartModalProvider = ({ children }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const contextValue = {
    isModalOpen,
    openModal,
    closeModal,
  };
  const dispatch = useDispatch();
  const deleteItemsInCart = () => {
    dispatch(emptyCart());
    closeModal();
  };
  return (
    <ModalContext.Provider value={contextValue}>
      {children}
      <Modal
        open={isModalOpen}
        onClose={closeModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            borderRadius: "12px",
            border: `"1px solid ${theme.colors.darkGrey}"`,
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography fontFamily="Poppins" variant="h6" component="h2">
            Oops... You already have items from another store in your cart.
          </Typography>
          <Typography fontFamily="Poppins" sx={{ mt: 2 }}>
            Would you like to delete the items you have and start over?
          </Typography>
          <Box
            display={"flex"}
            justifyContent="space-between"
            marginTop="1.5rem"
          >
            <DangerButton onClick={deleteItemsInCart}>
              Yes, Delete them{" "}
            </DangerButton>
            <PrimaryButton onClick={closeModal} invert={true}>
              Cancel
            </PrimaryButton>
          </Box>
        </Box>
      </Modal>
    </ModalContext.Provider>
  );
};

export default DeleteCartModalProvider;
