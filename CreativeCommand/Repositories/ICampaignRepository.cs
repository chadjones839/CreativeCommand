using System.Collections.Generic;
using CreativeCommand.Models;

namespace CreativeCommand.Repositories
{
    public interface ICampaignRepository
    {
        List<Campaign> GetAllCampaigns();
        Campaign GetCampaignById(int id);
        void Add(Campaign campaign);
        void Delete(int id);
        void Update(Campaign campaign);
        List<Campaign> GetAllCampaignsByAccountId(int accountId);
        Campaign GetBookedCampaignRevenue(int userId);
        Campaign GetPendingCampaignRevenue(int userId);
    }
}