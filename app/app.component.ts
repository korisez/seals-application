import { Component, OnInit, ChangeDetectorRef } from '@angular/core';

export interface Seal {
  label: string;
  seal_no: string;
}

export interface Template {
  label: string;
  value: string;
  initialSeals: number;
}

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  name = 'Angular 4';
  selectedTemplateValue: string | null = null;
  selectedTemplate: Template | null = null;

  templates: Template[] = [
    { label: '3 Seals Template', value: '3seals', initialSeals: 3 },
    { label: '5 Seals Template', value: '5seals', initialSeals: 5 },
    { label: 'Water Meter', value: 'waterMeter', initialSeals: 1 },
  ];

  sealLocationOptions: any[] = [
    { label: 'Meter', value: 'Meter' },
    { label: 'Temp 1 Sensor', value: 'Temp 1 Sensor' },
    { label: 'Temp 2 Sensor', value: 'Temp 2 Sensor' },
    { label: 'Meter CPU', value: 'Meter CPU' },
    { label: 'Flow Meter', value: 'Flow Meter' },
    { label: 'Flow Meter Mechanical Part', value: 'Flow Meter Mechanical Part' },
    { label: 'Temp 3 Sensor', value: 'Temp 3 Sensor' },
    { label: 'Single Seal', value: 'Single Seal' },
    // Add more locations as needed
  ];

  sealPositions: { [key: string]: Seal[] } = {
    '3seals': [
      { label: 'Meter', seal_no: '' },
      { label: 'Temp 1 Sensor', seal_no: '' },
      { label: 'Temp 2 Sensor', seal_no: '' },
    ],
    '5seals': [
      { label: 'Meter CPU', seal_no: '' },
      { label: 'Flow Meter', seal_no: '' },
      { label: 'Flow Meter Mechanical Part', seal_no: '' },
      { label: 'Temp 1 Sensor', seal_no: '' },
      { label: 'Temp 3 Sensor', seal_no: '' },
    ],
    waterMeter: [{ label: 'Single Seal', seal_no: '' }],
  };

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit() {}

  onTemplateChange(value: string) {
    this.selectedTemplateValue = value;
    this.selectedTemplate = this.templates.find((t) => t.value === value);
    this.ensureOneExtraSeal();
  }

  onSealChange(index: number) {
    const templateValue = this.selectedTemplateValue;
    if (!templateValue) return;

    const seals = this.sealPositions[templateValue];
    const initialSealsCount =
      this.templates.find((t) => t.value === templateValue)?.initialSeals || 0;

    // Only add a new custom seal if the last seal's input was changed and it has some text
    if (seals[index]?.seal_no && index === seals.length - 1) {
      seals.push({
        label: `Custom Seal ${seals.length - initialSealsCount + 1}`,
        seal_no: '',
      });
    }

    // Remove empty trailing custom seals, but ensure there is always one empty custom seal at the end
    while (
      seals.length > initialSealsCount + 1 &&
      !seals[seals.length - 1].seal_no &&
      !seals[seals.length - 2].seal_no
    ) {
      seals.pop();
    }

    this.cdr.detectChanges();
  }

  ensureOneExtraSeal() {
    const seals = this.sealPositions[this.selectedTemplateValue];
    const initialSealsCount = this.selectedTemplate?.initialSeals || 0;
    // Ensure there's always at least one custom seal beyond the initial seals
    if (seals.length === initialSealsCount) {
      seals.push({ label: `Custom Seal 1`, seal_no: '' });
    }
    this.cdr.detectChanges();
  }
}
