require 'rails_helper'
require 'date'

RSpec.describe BusStop, type: :model do

  context "seed file (mocked examples)" do

    it 'converts location in csv to lat/lon floats' do
      def lat_long(csv_location)
        csv_location.split(',').map { |location| location.gsub(/[\s)(]/,'').to_f }
      end

      expect(lat_long('(41.87632184, -87.77410482)')).to eq([41.87632184, -87.77410482])
    end

    it 'converts dates in csv to date objects' do
      def convert_date(csv_date)
        Date.strptime(csv_date, '%m/%d/%Y')
      end

      expect(convert_date('10/01/2012')).to eq(Date.parse('2012-10-01'))
    end
  end
end
