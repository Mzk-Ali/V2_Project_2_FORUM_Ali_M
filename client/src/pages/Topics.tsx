import SideSection from "../components/shared/SideSection";
import FiltersSection from "../components/topics/FiltersSection";
import MainSection from "../components/topics/MainSection";

export default function Topics() {
    return(
        <>
            <FiltersSection />
            <div className="flex gap-4 my-5">
                <MainSection />
                <SideSection />
            </div>
        </>
    )
};
