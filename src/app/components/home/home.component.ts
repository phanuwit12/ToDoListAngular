import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormBuilder,
  Validators,
} from '@angular/forms';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  // typesOfShoes: string[] = ['Boots', 'Clogs', 'Loafers', 'Moccasins', 'Sneakers'];
  public form_data: FormGroup;
  public data = [];
  public editData = '';
  public detail = new FormControl();
  public old: any;
  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.setValue();
    this.form_data = this.formBuilder.group({
      id: [0, Validators.required],
      detail: ['', Validators.required],
      success: [false, Validators.required],
      edit: [false, Validators.required],
      createAt: [this.getTime(), Validators.required],
      successAt: ['', Validators.required],
    });
  }
  setValue() {
    this.data = this.getValue();
  }
  getValue() {
    return (this.old = JSON.parse(window.localStorage.getItem('data')));
  }
  clearValue() {
    window.localStorage.clear();
    this.setValue();
  }
  deleteValue(value) {
    let data = this.data.filter((item) => {
      return item.id !== value.id;
    });
    console.log(data);
    window.localStorage.setItem('data', JSON.stringify(data));
    this.setValue();
  }
  addValue() {
    let old = this.getValue();
    this.form_data.controls['id'].setValue(new Date().getTime());
    this.form_data.controls['detail'].setValue(this.detail.value);
    this.form_data.controls['createAt'].setValue(this.getTime());

    console.log(this.form_data.value);
    if (old !== null) {
      window.localStorage.setItem(
        'data',
        JSON.stringify([...old, this.form_data.value])
      );
      this.setValue();
      this.clearFormSearch();
    } else {
      window.localStorage.setItem(
        'data',
        JSON.stringify([this.form_data.value])
      );
      this.setValue();
      this.clearFormSearch();
    }
  }
  clearFormSearch() {
    this.detail.setValue('');
    this.form_data.controls['id'].setValue(this.old.length);
    this.form_data.controls['detail'].setValue('');
    this.form_data.controls['success'].setValue(false);
    this.form_data.controls['edit'].setValue(false);
    this.form_data.controls['createAt'].setValue(this.getTime());
    this.form_data.controls['successAt'].setValue('');
  }
  successTodo(e, item) {
    let newData = this.data.map((data) => {
      if (data.id === item.id) {
        if (e.checked === true) {
          return {
            ...data,
            success: e.checked,
            successAt: this.getTime(),
          };
        } else {
          return {
            ...data,
            success: e.checked,
            successAt: '',
          };
        }
      } else return data;
    });
    window.localStorage.setItem('data', JSON.stringify(newData));
    this.setValue();
    // console.log(newData);
  }
  cancleEdit(item) {
    let old = this.getValue();
    let newData = old.map((data) => {
      if (data.id === item.id) {
        return {
          ...data,
          edit: !data.edit,
        };
      } else return data;
    });
    console.log(newData);
    window.localStorage.setItem('data', JSON.stringify(newData));
    this.setValue();
  }
  setEdit(item) {
    let newData = this.data.map((data) => {
      console.log(data.id === item.id);
      if (data.id === item.id) {
        return {
          ...data,
          edit: !data.edit,
        };
      } else return data;
    });
    window.localStorage.setItem('data', JSON.stringify(newData));
    this.setValue();
  }
  getTime() {
    var today = new Date();
    var date =
      today.getFullYear() +
      '-' +
      (today.getMonth() + 1) +
      '-' +
      today.getDate();
    var time =
      today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds();
    return date + ' ' + time;
  }
}
