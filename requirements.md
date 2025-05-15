

Background - Tax calculation

UK Income tax is calculated according to tax bands. Tax within each band is calculated based on the amount of the salary falling within a band. The total tax is the sum of the tax paid within all bands. Each band has an optional upper and
mandatory lower limit and a percentage rate of tax. Tax bands will not overlap. 

Each band takes its upper limit to be the lower limit of the next band. The tax band covering the upper part of the salary never has an upper limit.  The  
the uppermost tax band has a tax rate of 40%; this allows tax to be capped.

Sample data:

Tax Band                  
Annual Salary Range (£)           
Tax Rate (%)

Tax Band A                 
0 -  5000                                      
0
Tax Band B                 
5000 - 20000                               
20
Tax Band C                
20000 +
40


Both the tax rate and limits are integer values. Tax is calculated based on the gross annual salary. (see "Examples of tax calculations"). Net salary is gross salary less tax. Monthly amounts are the annual amounts divided by 12.




Specification

- You may use any type of user interface.
- You should assume the use of a relational database.
- You may use any open source libraries.




User Interface

The wireframes below indicate the requirements for two simple screens.

Salary entry screen:
----------------------------------------------------------------------------------
|                                     __________________      ________  |
| Gross Annual Salary: |__________________|    |_Calc___|  |
|                                                                                                 |
---------------------------------------------------------------------------------

Results screen:
----------------------------------------------------------------------------------
|                                     __________________      ________  |
| Gross Annual Salary: |_40000____________|    |_Calc___|  |
|                                                                                                 |
|--------------------------------------------------------- ---------------------   |
|                                                                                                 |
| Gross Annual Salary:  £ 40000                                               |
| Gross Monthly Salary:  £ 3333.33                                           |
| Net Annual Salary:    £ 29000                                                 |
| Net Monthly Salary:    £ 2416.67                                             |
| Annual Tax Paid:      £ 11000.00                                             |
| Monthly Tax Paid:       £ 916.67                                              |
|                                                                                                 |
----------------------------------------------------------------------------------


Examples of tax calculations

For salary: 10000 p.a.


    Salary in Band A = 5000 => Tax paid = 5000 x  0% =    0
    Salary in Band B = 5000 => Tax paid = 5000 x 20% = 1000
    Salary in Band C =    0 => Tax paid =    0 x 40% =    0

                              => Annual tax paid = 1000



For salary: 40000 p.a.

    Salary in Band A =  5000 => Tax paid =  5000 x  0% =    0
    Salary in Band B = 15000 => Tax paid = 15000 x 20% = 3000
    Salary in Band C = 20000 => Tax paid = 20000 x 40% = 8000

                               => Annual tax paid = 11000

