import { PageIndexModel } from './../../../models/pageIndexModel';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Country } from '../../../models/country';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CountriesService } from '../../../services/countries.service';
import { FilterPipe } from '../../../pipes/filter.pipe';
import * as $ from "jquery";

@Component({
  selector: 'app-countries',
  templateUrl: './countries.component.html',
  styleUrls: ['./countries.component.scss']
})
export class CountriesComponent implements OnInit
{
  //Objects for Holding Model Data
  countries: Country[] = [];
  showLoading = false;

  //Objects for Deconste
  deleteCountry: Country = new Country();
  editIndex = 0;
  deleteIndex = 0;

  //Properties for Searching
  searchBy = "countryName";
  searchText = "";

  //Properties for Paging
  currentPageIndex = 0;
  pages: PageIndexModel[] = [];
  pageSize = 7;

  //Reactive Forms
  newForm: FormGroup | any;
  editForm: FormGroup | any;

  //Autofocus TextBoxes
  @ViewChild("defaultTextBox_New") defaultTextBox_New: ElementRef | any;
  @ViewChild("defaultTextBox_Edit") defaultTextBox_Edit: ElementRef | any;

  //Sorting
  sortBy = "countryName";
  sortOrder = "ASC"; //ASC | DESC

  //Constructor
  constructor(private countriesService: CountriesService, private formBuilder: FormBuilder)
  {
  }

  ngOnInit(): void
  {
    //Get data from database
    this.countriesService.getCountries().subscribe(
      (response: Country[]) =>
      {
        this.countries = response;
        this.showLoading = false;
        this.calculateNoOfPages();
      }
    );

    //Create newForm
    this.newForm = this.formBuilder.group({
      countryID: this.formBuilder.control(null),
      countryName: this.formBuilder.control(null, [Validators.required])
    });

    //Create editForm
    this.editForm = this.formBuilder.group({
      countryID: this.formBuilder.control(null),
      countryName: this.formBuilder.control(null, [Validators.required])
    });
  }

  calculateNoOfPages(): void
  {
    //Get no. of Pages
    const filterPipe = new FilterPipe();
    const noOfPages = Math.ceil(filterPipe.transform(this.countries, this.searchBy, this.searchText).length / this.pageSize);
    this.pages = [];

    //Generate pages
    for (let i = 0; i < noOfPages; i++)
    {
      this.pages.push({ pageIndex: i } as PageIndexModel);
    }

    this.currentPageIndex = 0;
  }

  onPageIndexClicked(index: number): void
  {
    //Set currentPageIndex
    if (index >= 0 && index < this.pages.length)
    {
      this.currentPageIndex = index;
    }
  }

  onNewClick(): void
  {
    //reset the newForm
    this.newForm.reset({ countryID: 0 });
    setTimeout(() =>
    {
      //Focus the ClientLocation textbox in newForm
      this.defaultTextBox_New.nativeElement.focus();
    }, 100);
  }

  onSaveClick(): void
  {
    if (this.newForm.valid)
    {
      //Invoke the REST-API call
      this.countriesService.insertCountry(this.newForm.value).subscribe((response) =>
      {
        //Add Response to Grid
        const p: Country = new Country();
        p.countryID = response.countryID;
        p.countryName = response.countryName;
        this.countries.push(p);

        //Reset the newForm
        this.newForm.reset();
        $("#newCountryFormCancel").trigger("click");
        this.calculateNoOfPages();

      }, (error) =>
        {
          console.log(error);
        });
    }
  }

  onEditClick( country: Country): void
  {
    //Reset the editForm
    this.editForm.reset();

    setTimeout(() =>
    {
      //Set data into editForm
      this.editForm.patchValue(country);
      this.editIndex = this.countries.indexOf(country);

      //Focus the ClientLocation textbox in editForm
      this.defaultTextBox_Edit.nativeElement.focus();
    }, 100);
  }

  onUpdateClick():void
  {
    if (this.editForm.valid)
    {
      //Invoke the REST-API call
      this.countriesService.updateCountry(this.editForm.value).subscribe((response: Country) =>
      {
        //Update the response in Grid
        this.countries[this.editIndex] = response;

        //Reset the editForm
        this.editForm.reset();
        $("#editCountryFormCancel").trigger("click");
      },
        (error) =>
        {
          console.log(error);
        });
    }
  }

  onDeleteClick(country: Country): void
  {
    //Set data into deconsteCountry
    this.deleteCountry.countryID = country.countryID;
    this.deleteCountry.countryName = country.countryName;
    this.deleteIndex = this.countries.indexOf(country);
  }

  onDeleteConfirmClick(): void
  {
    //Invoke the REST-API call
    this.countriesService.deleteCountry(this.deleteCountry.countryID).subscribe(
      () =>
      {
        //Deconste object in Grid
        this.countries.splice(this.deleteIndex, 1);

        //Clear deconsteCountry
        this.deleteCountry.countryID = 0;
        this.deleteCountry.countryName = '';

        this.calculateNoOfPages();
      },
      (error:unknown) =>
      {
        console.log(error);
      });
  }

  onSearchTextChange(): void
  {
    //Recall the calculateNoOfPages
    this.calculateNoOfPages();
  }
}
