import React from "react";
import { FlatList } from "react-native";
import SearchCustomerListItem from "./SearchCustomerListItem";

const SearchCustomerList = () => {
  return (
    <FlatList
      style={{
        backgroundColor: "lightgray",
        borderWidth: 0,
        borderBottomLeftRadius: 8,
        borderBottomRightRadius: 8,
        padding: 2,
      }}
      scrollEnabled={false}
      data={[{ name: "Juan" }, { name: "Pedro" }]}
      renderItem={({ item }) => <SearchCustomerListItem name={item.name} />}
    />
  );
};

export default SearchCustomerList;
