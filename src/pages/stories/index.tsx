import List from "../../components/List";
import ListItem from "../../components/List/ListItem";

const stories = () => {
  return (
    <List>
      <ListItem id={"hello1"}>hello1</ListItem>
      <ListItem id={"hello2"}>hello2</ListItem>
      <ListItem id={"hello3"}>hello3</ListItem>
    </List>
  );
};

export default stories;
