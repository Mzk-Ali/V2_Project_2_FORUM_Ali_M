export default function PopularFilter() {
    return(
        <div className="flex items-center gap-3">
            <div className="px-4 py-2 rounded-md bg-slate-300 hover:bg-slate-400 cursor-pointer font-semibold dark:bg-slate-900 dark:hover:bg-slate-950">Plus Récent</div>
            <div className="px-4 py-2 rounded-md bg-slate-300 hover:bg-slate-400 cursor-pointer font-semibold dark:bg-slate-900 dark:hover:bg-slate-950">Plus Populaire</div>
            <div className="px-4 py-2 rounded-md bg-slate-300 hover:bg-slate-400 cursor-pointer font-semibold dark:bg-slate-900 dark:hover:bg-slate-950">Unlock</div>
        </div>
    )
};
