using System.ComponentModel.DataAnnotations;

namespace TaxCalculator.Models;

public class TaxBand
{
    [Key]
    public int Id { get; set; }

    public int TaxRuleSetId { get; set; }
    public TaxRuleSet? TaxRuleSet { get; set; }

    [Required]
    [StringLength(50)]
    public required string Name { get; set; }

    [Required]
    [Range(0, int.MaxValue, ErrorMessage = "LowerLimit can not be negative")]
    public required int LowerLimit { get; set; }

    [Required]
    [Range(0, 100, ErrorMessage = "Percentage rate must be between 0 and 100")]
    public required int PercentageRate { get; set; }
}
