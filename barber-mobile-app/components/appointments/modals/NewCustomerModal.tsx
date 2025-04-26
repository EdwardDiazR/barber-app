import { Modal, StyleSheet, Text, View } from "react-native";
import React from "react";

const NewCustomerModal = ({ isOpen }: { isOpen: boolean }) => {
  return (
    <Modal visible={isOpen}>
      <Text>NewCustomerModal</Text>
    </Modal>
  );
};

export default NewCustomerModal;

const styles = StyleSheet.create({});
