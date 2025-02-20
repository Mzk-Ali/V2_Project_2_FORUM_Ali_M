import FilterPanel from "./FilterPanel";
import PopularFilter from "./PopularFilter";

export default function FiltersSection() {
    return(
        <div className="flex flex-col gap-4 m-4">
            <FilterPanel />
            <PopularFilter />
        </div>
    )
};
