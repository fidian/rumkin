/**
 * Live population estimates.
 *
 * The data is a snapshot: a population at a known date, plus yearly rates
 * of births, deaths and net migration. The running figure is that snapshot
 * projected forward to right now, which is why the numbers tick upward
 * while you watch.
 *
 * No DOM here.
 */

/** One area, as it comes out of populations.json. */
export interface RawArea {
    /** Area code. Below 900 is a country; 900 and up is a region. */
    I: number;
    /** Label. */
    L: string;
    /** Population at the snapshot date. */
    P: number;
    /** Births, deaths and net migration per year. */
    B: number;
    D: number;
    M: number;
}

export interface Area extends RawArea {
    days: number;
    births: number;
    deaths: number;
    migrations: number;
    population: number;
}

const DAYS_PER_YEAR = 365.2425;
const MS_PER_DAY = 86400000;

/** Project an area's snapshot forward to `now`. */
export const projectArea = (
    area: RawArea,
    since: Date,
    now: Date = new Date()
): Area => {
    const days = (now.getTime() - since.getTime()) / MS_PER_DAY;
    const years = days / DAYS_PER_YEAR;
    const births = Math.floor(area.B * years);
    const deaths = Math.floor(area.D * years);
    const migrations = Math.floor(area.M * years);

    return {
        ...area,
        days,
        births,
        deaths,
        migrations,
        population: area.P + births - deaths + migrations,
    };
};

/** Regions are coded 900 and up; everything below is a country. */
export const isRegion = (area: RawArea) => area.I >= 900;

/**
 * Split the areas into countries and regions, applying any nicer names and
 * sorting each list by label, case-insensitively.
 */
export const splitAreas = (
    data: Record<string, RawArea>,
    renames: Record<string, string> = {}
) => {
    const named = Object.values(data).map((area) => ({
        ...area,
        L: renames[area.I] ?? area.L,
    }));

    const byLabel = (a: RawArea, b: RawArea) =>
        a.L.toLowerCase().localeCompare(b.L.toLowerCase());

    return {
        countries: named.filter((area) => !isRegion(area)).sort(byLabel),
        regions: named.filter(isRegion).sort(byLabel),
    };
};

export const findArea = (
    data: Record<string, RawArea>,
    id: string | number
): RawArea | undefined => data[String(id)];

/** Grouped digits, which is how a population that large stays readable. */
export const formatCount = (value: number) => value.toLocaleString();
