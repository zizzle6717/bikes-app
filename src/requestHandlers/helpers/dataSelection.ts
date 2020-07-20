import getAge from '../../utilities/getAge';

interface IFilters {
  localEndTime?: {
    lowerBound: string;
    upperBound: string;
  };
  stationEndIds?: string[];
  riderAgeRanges?: string[];
}

export interface IFindInRangeArgs {
  data: any;
  filters?: IFilters;
  order: string;
  orderBy: string;
}

const dateTimeTripColumns = ['local_start_time', 'local_end_time'];
const rangeRegex = /^[0-9]+-[0-9]+$/;
const rangeGTRegex = /^^[0-9]+\+$/;

const findInRange = ({
  data,
  filters,
  order = 'asc',
  orderBy,
}: IFindInRangeArgs) => {
  let filteredData = data;

  if (filters) {
    // Trip End Time
    filteredData = data
      .filter(entry => {
        let valid = true;
        if (filters.localEndTime) {
          valid = new Date(entry.local_end_time) >= new Date(filters.localEndTime.lowerBound)
            && new Date(entry.local_end_time) < new Date(filters.localEndTime.upperBound);
        }
        return valid;
      });

    // Station End IDs
    filteredData = filteredData
      .filter(entry => {
        let valid = true;
        if (filters.stationEndIds) {
          valid = valid && filters.stationEndIds.includes(entry.station_end_id);
          if (!valid) { return false; } // short-circuit
        }
        return valid;
      });

    // Rider Age
    filteredData = filteredData
      .filter(entry => {
        let valid = true;
        if (filters.riderAgeRanges) {
          const isInAgeRange = filters.riderAgeRanges.some((range: string) => {
            const riderAge = getAge(entry.rider_birth_year);
            if (rangeRegex.test(range)) {
              const bounds = range.split('-');
              return riderAge >= Number(bounds[0]) && riderAge <= Number(bounds[1]);
            }
            if (rangeGTRegex.test(range)) {
              const bounds = range.split('+');
              return riderAge >= Number(bounds[0]);
            }
            if (range === 'unknown') {
              return !entry.rider_birth_year || entry.rider_birth_year === 'unknown';
            }
            return false;
          });
          valid = valid && isInAgeRange;
        }
        return valid;
      });
  }

  if (orderBy) {
    filteredData.sort((a, b) => {
      const aFormatted = dateTimeTripColumns.includes(orderBy) ? new Date(a[orderBy]) : a[orderBy];
      const bFormatted = dateTimeTripColumns.includes(orderBy) ? new Date(b[orderBy]) : b[orderBy];

      if (order === 'asc') {
        return aFormatted - bFormatted;
      }

      return bFormatted - aFormatted;
    });
  }

  return filteredData;
};

export {
  findInRange,
};
