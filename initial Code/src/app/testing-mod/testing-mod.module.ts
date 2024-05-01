import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterTestingModule } from '@angular/router/testing';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { DateInMonth } from '../DateInMonth';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
  ],
  exports: [
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientTestingModule
  ]
})
export class TestingModModule {
  city1 = [
    { cityName: 'Abdc' },
    { cityName: 'ABc' },
    { cityName: 'Acc' }
  ];
  city2 = [
    { cityName: 'fAbdc' },
    { cityName: 'gABc' },
    { cityName: 'vAcc' }
  ];
  city3 = [
    { cityName: 'fAbdc' },
    { cityName: 'gABc' },
    { cityName: 'vAccvvv' },
    { cityName: 'dfdf' },
    { cityName: 'gggggggggg' },
    { cityName: 'dddddd' }
  ];
  resOb1 = [{
    date: '14/02/2020',
    id: 131,
    holidayName: 'kvvvbbbb'
  }, {
    date: '15/02/2020',
    id: 132,
    holidayName: 'cccc'
  }, {
    date: '29/02/2020',
    id: 134,
    holidayName: 'new day'
  }];

  resOb2 = [
    {
      date: '05/12/2019',
      id: 134,
      holidayName: 'new day'
    },
    {
      date: '18/12/2019',
      id: 131,
      holidayName: 'kvvvbbbb'
    }, {
      date: '20/12/2019',
      id: 132,
      holidayName: 'cccc'
    }, {
      date: '22/12/2019',
      id: 132,
      holidayName: 'uashdashdjk'
    }
  ];

  dateObj1 = [
    [{ enabled: false, date: '26/01/2020' },
    { enabled: false, date: '27/01/2020' },
    { enabled: false, date: '28/01/2020' },
    { enabled: false, date: '29/01/2020' },
    { enabled: false, date: '30/01/2020' },
    { enabled: false, date: '31/01/2020' },
    { enabled: true, date: '01/02/2020' }],
    [{ enabled: true, date: '02/02/2020' },
    { enabled: true, date: '03/02/2020' },
    { enabled: true, date: '04/02/2020' },
    { enabled: true, date: '05/02/2020' },
    { enabled: true, date: '06/02/2020' },
    { enabled: true, date: '07/02/2020' },
    { enabled: true, date: '08/02/2020' }],
    [{ enabled: true, date: '09/02/2020' },
    { enabled: true, date: '10/02/2020' },
    { enabled: true, date: '11/02/2020' },
    { enabled: true, date: '12/02/2020' },
    { enabled: true, date: '13/02/2020' },
    { enabled: true, date: '14/02/2020' },
    { enabled: true, date: '15/02/2020' }],
    [{ enabled: true, date: '16/02/2020' },
    { enabled: true, date: '17/02/2020' },
    { enabled: true, date: '18/02/2020' },
    { enabled: true, date: '19/02/2020' },
    { enabled: true, date: '20/02/2020' },
    { enabled: true, date: '21/02/2020' },
    { enabled: true, date: '22/02/2020' }],
    [{ enabled: true, date: '23/02/2020' },
    { enabled: true, date: '24/02/2020' },
    { enabled: true, date: '25/02/2020' },
    { enabled: true, date: '26/02/2020' },
    { enabled: true, date: '27/02/2020' },
    { enabled: true, date: '28/02/2020' },
    { enabled: true, date: '29/02/2020' }],
    [{ enabled: false, date: '01/03/2020' },
    { enabled: false, date: '02/03/2020' },
    { enabled: false, date: '03/03/2020' },
    { enabled: false, date: '04/03/2020' },
    { enabled: false, date: '05/03/2020' },
    { enabled: false, date: '06/03/2020' },
    { enabled: false, date: '07/03/2020' }]
  ];
  dateObj2 = [
    [{ enabled: false, date: '24/11/2019' },
    { enabled: false, date: '25/11/2019' },
    { enabled: false, date: '26/11/2019' },
    { enabled: false, date: '27/11/2019' },
    { enabled: false, date: '28/11/2019' },
    { enabled: false, date: '29/11/2019' },
    { enabled: false, date: '30/11/2019' }],
    [{ enabled: true, date: '01/12/2019' },
    { enabled: true, date: '02/12/2019' },
    { enabled: true, date: '03/12/2019' },
    { enabled: true, date: '04/12/2019' },
    { enabled: true, date: '05/12/2019' },
    { enabled: true, date: '06/12/2019' },
    { enabled: true, date: '07/12/2019' }],
    [{ enabled: true, date: '08/12/2019' },
    { enabled: true, date: '09/12/2019' },
    { enabled: true, date: '10/12/2019' },
    { enabled: true, date: '11/12/2019' },
    { enabled: true, date: '12/12/2019' },
    { enabled: true, date: '13/12/2019' },
    { enabled: true, date: '14/12/2019' }],
    [{ enabled: true, date: '15/12/2019' },
    { enabled: true, date: '16/12/2019' },
    { enabled: true, date: '17/12/2019' },
    { enabled: true, date: '18/12/2019' },
    { enabled: true, date: '19/12/2019' },
    { enabled: true, date: '20/12/2019' },
    { enabled: true, date: '21/12/2019' }],
    [{ enabled: true, date: '22/12/2019' },
    { enabled: true, date: '23/12/2019' },
    { enabled: true, date: '24/12/2019' },
    { enabled: true, date: '25/12/2019' },
    { enabled: true, date: '26/12/2019' },
    { enabled: true, date: '27/12/2019' },
    { enabled: true, date: '28/12/2019' }],
    [{ enabled: true, date: '29/12/2019' },
    { enabled: true, date: '30/12/2019' },
    { enabled: true, date: '31/12/2019' },
    { enabled: false, date: '01/01/2020' },
    { enabled: false, date: '02/01/2020' },
    { enabled: false, date: '03/01/2020' },
    { enabled: false, date: '04/01/2020' }]
  ];

  dateObj3 = [
    [{ enabled: false, date: '23/02/2020' },
    { enabled: false, date: '24/02/2020' },
    { enabled: false, date: '25/02/2020' },
    { enabled: false, date: '26/02/2020' },
    { enabled: false, date: '27/02/2020' },
    { enabled: false, date: '28/02/2020' },
    { enabled: false, date: '29/02/2020' }],
    [{ enabled: true, date: '01/03/2020' },
    { enabled: true, date: '02/03/2020' },
    { enabled: true, date: '03/03/2020' },
    { enabled: true, date: '04/03/2020' },
    { enabled: true, date: '05/03/2020' },
    { enabled: true, date: '06/03/2020' },
    { enabled: true, date: '07/03/2020' }],
    [{ enabled: true, date: '08/03/2020' },
    { enabled: true, date: '09/03/2020' },
    { enabled: true, date: '10/03/2020' },
    { enabled: true, date: '11/03/2020' },
    { enabled: true, date: '12/03/2020' },
    { enabled: true, date: '13/03/2020' },
    { enabled: true, date: '14/03/2020' }],
    [{ enabled: true, date: '15/03/2020' },
    { enabled: true, date: '16/03/2020' },
    { enabled: true, date: '17/03/2020' },
    { enabled: true, date: '18/03/2020' },
    { enabled: true, date: '19/03/2020' },
    { enabled: true, date: '20/03/2020' },
    { enabled: true, date: '21/03/2020' }],
    [{ enabled: true, date: '22/03/2020' },
    { enabled: true, date: '23/03/2020' },
    { enabled: true, date: '24/03/2020' },
    { enabled: true, date: '25/03/2020' },
    { enabled: true, date: '26/03/2020' },
    { enabled: true, date: '27/03/2020' },
    { enabled: true, date: '28/03/2020' }],
    [{ enabled: true, date: '29/03/2020' },
    { enabled: true, date: '30/03/2020' },
    { enabled: true, date: '31/03/2020' },
    { enabled: false, date: '01/04/2020' },
    { enabled: false, date: '02/04/2020' },
    { enabled: false, date: '03/04/2020' },
    { enabled: false, date: '04/04/2020' }]];

  viewEditObj1 = {
    date: '02/06/2020',
    id: 134,
    city: 'hhjv',
    holidayName: 'TD'
  };

  viewEditObj2 = {
    date: '05/06/2020',
    id: 132,
    city: 'hhjsddv',
    holidayName: 'wee shdhsgdh'
  };

  getHolidayReq1 = {
    city_name: 'sdsdsds',
    year: 2019,
    month: 2
  };
  getHolidayReq2 = {
    city_name: 'shhsdsds',
    year: 2020,
    month: 5
  };
  getSelectedHolidayInfoReq1 = {
    date: '14/02/2020',
    city_name: 'hhjv'
  };
  getSelectedHolidayInfoReq2 = {
    date: '14/02/2019',
    city_name: 'hdjfjk'
  };
  addHolidayReq1Date = '14/02/2020';
  addHolidayReq1 = {
    city_name: 'chjsdhjs',
    date: '2020-02-14',
    holidayName: 'asdgbio'
  };

  addHolidayReq2Date = '14/07/2019';
  addHolidayReq2 = {
    city_name: 'ckdmkfnm',
    date: '2019-07-14',
    holidayName: 'vvjmvmvm'
  };
  signInReq1 = {
    admin_email: 'test@tttttcccccs.com',
    password: 'vvvvvv'
  };
  signInReq2 = {
    admin_email: 'test@ccccs.com',
    password: 'dgfdnkfn'
  };
  updateReq1 = {
    city_name: this.viewEditObj1.city,
    date: this.viewEditObj1.date,
    holidayName: this.viewEditObj1.holidayName
  };

  updateReq2 = {
    city_name: this.viewEditObj2.city,
    date: this.viewEditObj2.date,
    holidayName: this.viewEditObj2.holidayName
  };

  displayDate = [{
    endLoop1: 3,
    endLoop2: 34,
    beginDate: 29,
    year: 2020,
    month: 1,
    resObj: [
      {
        date: '14/01/2020',
        id: 131,
        holidayName: 'kvvvbbbb'
      }, {
        date: '15/01/2020',
        id: 132,
        holidayName: 'cccc'
      }, {
        date: '29/01/2020',
        id: 134,
        holidayName: 'new day'
      }
    ]
  },
  {
    endLoop1: 7,
    endLoop2: 38,
    beginDate: 23,
    year: 2020,
    month: 3,
    resObj: [
      {
        date: '05/03/2020',
        id: 131,
        holidayName: 'kvvvbbbb'
      }, {
        date: '25/03/2020',
        id: 132,
        holidayName: 'cccc'
      }, {
        date: '29/03/2020',
        id: 134,
        holidayName: 'jskdhjkshd'
      },
      {
        date: '30/03/2020',
        id: 135,
        holidayName: 'new day'
      }
    ]
  },
  {
    endLoop1: 7,
    endLoop2: 38,
    beginDate: 24,
    year: 2019,
    month: 12,
    resObj: [
      {
        date: '05/12/2019',
        id: 131,
        holidayName: 'kvvvbbbb'
      }, {
        date: '08/12/2019',
        id: 132,
        holidayName: 'cccc'
      }, {
        date: '29/12/2019',
        id: 134,
        holidayName: 'jskdhjkshd'
      },
      {
        date: '30/12/2019',
        id: 135,
        holidayName: 'new day'
      }
    ]
  },
  {
    endLoop1: 6,
    endLoop2: 37,
    beginDate: 26,
    year: 2020,
    month: 8,
    resObj: [
      {
        date: '05/08/2020',
        id: 131,
        holidayName: 'kvvvbbbb'
      }, {
        date: '08/08/2020',
        id: 132,
        holidayName: 'cccc'
      }, {
        date: '29/08/2020',
        id: 134,
        holidayName: 'jskdhjkshd'
      },
      {
        date: '30/08/2020',
        id: 135,
        holidayName: 'new day'
      }
    ]
  },
  {
    endLoop1: 4,
    endLoop2: 34,
    beginDate: 28,
    year: 2018,
    month: 11,
    resObj: [
      {
        date: '02/11/2018',
        id: 131,
        holidayName: 'asdfadsfadf'
      }, {
        date: '07/11/2018',
        id: 132,
        holidayName: 'cccc'
      }, {
        date: '29/11/2018',
        id: 134,
        holidayName: 'dfdfdfd'
      },
      {
        date: '30/11/2018',
        id: 135,
        holidayName: 'asdasdasasdff'
      }
    ]
  }

  ];
  convertModel(vv) {
    let cc, res = [];

    switch (vv) {
      case 1: cc = this.dateObj1;
        break;

      case 2: cc = this.dateObj2;
        break;

      case 3: cc = this.dateObj3;
        break;
    }
    cc.forEach(element1 => {
      let c = [];
      element1.forEach(element2 => {
        let dd = new DateInMonth();
        dd.enabled = element2.enabled;
        dd.date = element2.date;
        c.push(dd);
      });
      res.push(c);
    });
    return res;
  }
}
