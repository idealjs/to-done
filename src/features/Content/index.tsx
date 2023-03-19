import { CheckCircleIcon } from "@heroicons/react/24/outline";

import List from "../../components/List";
import ListItem from "../../components/List/ListItem";

const mockData = [
  { id: "aaa", content: "aaaa", title: "aaa" },
  { id: "bbb1", content: "bbbb", title: "bbb" },
  { id: "bbb2", content: "bbbb", title: "bbb" },
  { id: "bbb3", content: "bbbb", title: "bbb" },
  { id: "bbb4", content: "bbbb", title: "bbb" },
  { id: "bbb5", content: "bbbb", title: "bbb" },
  { id: "bbb6", content: "bbbb", title: "bbb" },
  { id: "bbb7", content: "bbbb", title: "bbb" },
  { id: "bbb8", content: "bbbb", title: "bbb" },
  { id: "bbb9", content: "bbbb", title: "bbb" },
  { id: "bbb10", content: "bbbb", title: "bbb" },
  { id: "bbb11", content: "bbbb", title: "bbb" },
  { id: "bbb12", content: "bbbb", title: "bbb" },
  { id: "bbb13", content: "bbbb", title: "bbb" },
  { id: "bbb14", content: "bbbb", title: "bbb" },
  { id: "bbb15", content: "bbbb", title: "bbb" },
  { id: "bbb16", content: "bbbb", title: "bbb" },
  { id: "bbb17", content: "bbbb", title: "bbb" },
];

const Content = () => {
  return (
    <div className="w-full justify-around 2xl:justify-between">
      <List className="w-full sm:w-full md:w-full lg:w-4/5 xl:w-5/6 2xl:w-8/12">
        {mockData.map((data) => {
          return (
            <ListItem key={data.id} className={"flex-row bg-base-200"}>
              <div>
                <input type="checkbox" className="checkbox mt-1" />
              </div>
              <div tabIndex={0} className="collapse collapse-arrow w-full">
                <input type="checkbox" className="min-h-fit" />
                <div className="collapse-title text-xl min-h-fit py-1">
                  <div className="flex items-center h-6">{data.title}</div>
                </div>
                <div className="collapse-content">
                  <p>{data.content}</p>
                </div>
              </div>
            </ListItem>
          );
        })}
      </List>
    </div>
  );
};
export default Content;
