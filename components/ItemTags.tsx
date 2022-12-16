import React from "react";
import { BASE_PATH } from "../constants/global";

export type ItemTagsProps = {
    tags: {
        name: string;
        slug: string;
    }[];
};

export const ItemTags: React.FC<ItemTagsProps> = ({ tags }) => {
    return (
        <React.Fragment>
            {tags.map((tag, i) => (
                <React.Fragment key={tag.slug}>
                    {!!i && `, `}
                    {/* @ts-ignore */}
                    {/* <Link href={replaceSlashes(`/${BASE_PATH}/${tagsPath}/${tag.slug}`)}> */}
                    {tag.name}
                    {/* </Link> */}
                </React.Fragment>
            ))}
        </React.Fragment>
    );
};
export default ItemTags;