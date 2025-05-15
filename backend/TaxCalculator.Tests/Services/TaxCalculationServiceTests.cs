using Moq;
using TaxCalculator.Models;
using TaxCalculator.Repositories;
using TaxCalculator.Services;

namespace TaxCalculator.Tests.Services;

public class TaxCalculationServiceTests
{
    [Fact]
    public async Task CalculateTax_WithSalaryInFirstBand_ReturnsCorrectCalculation()
    {
        // Arrange
        var taxBands = new List<TaxBand>
        {
            new TaxBand
            {
                Id = 1,
                Name = "Band A",
                LowerLimit = 0,
                PercentageRate = 0,
            },
            new TaxBand
            {
                Id = 2,
                Name = "Band B",
                LowerLimit = 5000,
                PercentageRate = 20,
            },
            new TaxBand
            {
                Id = 3,
                Name = "Band C",
                LowerLimit = 20000,
                PercentageRate = 40,
            },
        };

        var mockRepository = new Mock<ITaxRulesRepository>();
        mockRepository.Setup(r => r.GetOrderedTaxBandsForRuleSetAsync(1)).ReturnsAsync(taxBands);

        var service = new TaxCalculationService(mockRepository.Object);

        // Act
        var result = await service.CalculateTax(4000, 1);

        // Assert
        var expectedResult = new TaxCalculationResult
        {
            GrossAnnualSalary = 4000m,
            GrossMonthlySalary = 333.33m,
            NetAnnualSalary = 4000m,
            NetMonthlySalary = 333.33m,
            AnnualTaxPaid = 0m,
            MonthlyTaxPaid = 0m,
        };

        Assert.Equal(expectedResult, result);
    }

    [Fact]
    public async Task CalculateTax_WithSalaryInSecondBand_ReturnsCorrectCalculation()
    {
        // Arrange
        var taxBands = new List<TaxBand>
        {
            new TaxBand
            {
                Id = 1,
                Name = "Band A",
                LowerLimit = 0,
                PercentageRate = 0,
            },
            new TaxBand
            {
                Id = 2,
                Name = "Band B",
                LowerLimit = 5000,
                PercentageRate = 20,
            },
            new TaxBand
            {
                Id = 3,
                Name = "Band C",
                LowerLimit = 20000,
                PercentageRate = 40,
            },
        };

        var mockRepository = new Mock<ITaxRulesRepository>();
        mockRepository.Setup(r => r.GetOrderedTaxBandsForRuleSetAsync(1)).ReturnsAsync(taxBands);

        var service = new TaxCalculationService(mockRepository.Object);

        // Act
        var result = await service.CalculateTax(15000, 1);

        // Assert
        var expectedResult = new TaxCalculationResult
        {
            GrossAnnualSalary = 15000m,
            GrossMonthlySalary = 1250m,
            NetAnnualSalary = 13000m,
            NetMonthlySalary = 1083.33m,
            AnnualTaxPaid = 2000m,
            MonthlyTaxPaid = 166.67m,
        };

        Assert.Equal(expectedResult, result);
    }

    [Fact]
    public async Task CalculateTax_WithSalaryInThirdBand_ReturnsCorrectCalculation()
    {
        // Arrange
        var taxBands = new List<TaxBand>
        {
            new TaxBand
            {
                Id = 1,
                Name = "Band A",
                LowerLimit = 0,
                PercentageRate = 0,
            },
            new TaxBand
            {
                Id = 2,
                Name = "Band B",
                LowerLimit = 5000,
                PercentageRate = 20,
            },
            new TaxBand
            {
                Id = 3,
                Name = "Band C",
                LowerLimit = 20000,
                PercentageRate = 40,
            },
        };

        var mockRepository = new Mock<ITaxRulesRepository>();
        mockRepository.Setup(r => r.GetOrderedTaxBandsForRuleSetAsync(1)).ReturnsAsync(taxBands);

        var service = new TaxCalculationService(mockRepository.Object);

        // Act
        var result = await service.CalculateTax(30000, 1);

        // Assert
        var expectedResult = new TaxCalculationResult
        {
            GrossAnnualSalary = 30000m,
            GrossMonthlySalary = 2500,
            NetAnnualSalary = 23000.0m,
            NetMonthlySalary = 1916.67m,
            AnnualTaxPaid = 7000.0m,
            MonthlyTaxPaid = 583.33m,
        };
        Assert.Equal(expectedResult, result);
    }

    [Fact]
    public async Task CalculateTax_WithZeroSalary_ReturnsCorrectCalculation()
    {
        // Arrange
        var taxBands = new List<TaxBand>
        {
            new TaxBand
            {
                Id = 1,
                Name = "Band A",
                LowerLimit = 0,
                PercentageRate = 0,
            },
            new TaxBand
            {
                Id = 2,
                Name = "Band B",
                LowerLimit = 5000,
                PercentageRate = 20,
            },
            new TaxBand
            {
                Id = 3,
                Name = "Band C",
                LowerLimit = 20000,
                PercentageRate = 40,
            },
        };

        var mockRepository = new Mock<ITaxRulesRepository>();
        mockRepository.Setup(r => r.GetOrderedTaxBandsForRuleSetAsync(1)).ReturnsAsync(taxBands);

        var service = new TaxCalculationService(mockRepository.Object);

        // Act
        var result = await service.CalculateTax(0, 1);

        // Assert
        var expectedResult = new TaxCalculationResult
        {
            GrossAnnualSalary = 0m,
            GrossMonthlySalary = 0m,
            NetAnnualSalary = 0,
            NetMonthlySalary = 0m,
            AnnualTaxPaid = 0m,
            MonthlyTaxPaid = 0m,
        };

        Assert.Equal(expectedResult, result);
    }

    [Fact]
    public async Task CalculateTax_WithHighSalary_ReturnsCorrectCalculation()
    {
        // Arrange
        var taxBands = new List<TaxBand>
        {
            new TaxBand
            {
                Id = 2,
                Name = "Band B",
                LowerLimit = 4000,
                PercentageRate = 15,
            },
            new TaxBand
            {
                Id = 3,
                Name = "Band C",
                LowerLimit = 30000,
                PercentageRate = 50,
            },
        };

        var mockRepository = new Mock<ITaxRulesRepository>();
        mockRepository.Setup(r => r.GetOrderedTaxBandsForRuleSetAsync(1)).ReturnsAsync(taxBands);

        var service = new TaxCalculationService(mockRepository.Object);

        // Act
        var result = await service.CalculateTax(100000, 1);

        var expectedResult = new TaxCalculationResult
        {
            GrossAnnualSalary = 100000m,
            GrossMonthlySalary = 8333.33m,
            NetAnnualSalary = 61100.00m,
            NetMonthlySalary = 5091.67m,
            AnnualTaxPaid = 38900.00m,
            MonthlyTaxPaid = 3241.67m,
        };
        Assert.Equal(expectedResult, result);
    }
}
