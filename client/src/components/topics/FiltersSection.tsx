import FilterPanel from "./FilterPanel";
import PopularFilter from "./PopularFilter";

export default function FiltersSection() {
    return(
        <div className="flex flex-col gap-4 p-4 mx-auto max-w-[1100px]">
            <FilterPanel />
            <PopularFilter />
        </div>
    )
};
