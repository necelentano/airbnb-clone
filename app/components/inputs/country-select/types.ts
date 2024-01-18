export type CountruSelectValue = {
  flag: string;
  label: string;
  latlng: number[];
  region: string;
  value: string;
};

export interface CountrySelectProps {
  value?: CountruSelectValue;
  onChange: (value: CountruSelectValue) => void;
}
